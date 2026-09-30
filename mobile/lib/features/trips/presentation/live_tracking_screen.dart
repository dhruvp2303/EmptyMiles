import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../core/theme/app_theme.dart';

class LiveTrackingScreen extends StatefulWidget {
  final String tripId;
  const LiveTrackingScreen({super.key, required this.tripId});

  @override
  State<LiveTrackingScreen> createState() => _LiveTrackingScreenState();
}

class _LiveTrackingScreenState extends State<LiveTrackingScreen> {
  int _currentStep = 2; // 0: En Route Pickup, 1: At Pickup, 2: In Transit, 3: Arrived Delivery, 4: POD Completed

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('Live Radar: ${widget.tripId}'),
        leading: IconButton(
          icon: const Icon(LucideIcons.arrowLeft),
          onPressed: () => context.pop(),
        ),
      ),
      body: Column(
        children: [
          // Simulated Map Area / Radar Container
          Container(
            height: 240,
            width: double.infinity,
            color: const Color(0xFF1E293B),
            child: Stack(
              children: [
                // Simulated Highway Path
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.black.withOpacity(0.6),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: Colors.white24),
                        ),
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(LucideIcons.radio, color: AppColors.success, size: 16),
                            SizedBox(width: 8),
                            Text(
                              'GPS Telemetry Active • NH 48 Bharuch Bypass',
                              style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 20),
                      const Icon(LucideIcons.truck, color: AppColors.brandAmber, size: 36),
                      const SizedBox(height: 8),
                      const Text(
                        '198 km / 280 km • ETA 85 Mins',
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 14),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Trip Progress Detail Sheet
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: AppColors.border),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'DISPATCH PROGRESS',
                        style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: AppColors.textSecondary),
                      ),
                      const SizedBox(height: 16),
                      _buildTimelineStep(
                        title: 'En Route to Sanand GIDC',
                        time: '10:30 AM',
                        isCompleted: true,
                      ),
                      _buildTimelineStep(
                        title: 'Pickup Loaded & Weighbridge Verified',
                        time: '01:15 PM',
                        isCompleted: true,
                      ),
                      _buildTimelineStep(
                        title: 'In Transit on NH 48 (Bharuch Bypass)',
                        time: 'Active Now',
                        isCompleted: true,
                        isCurrent: true,
                      ),
                      _buildTimelineStep(
                        title: 'Arrive at Surat Textile Market',
                        time: 'Est. 04:30 PM',
                        isCompleted: false,
                      ),
                      _buildTimelineStep(
                        title: 'Consignee OTP & Digital POD Signoff',
                        time: 'Pending Delivery',
                        isCompleted: false,
                        isLast: true,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primaryNavy,
                  ),
                  onPressed: () => context.push('/pod/${widget.tripId}'),
                  icon: const Icon(LucideIcons.fileCheck, size: 18),
                  label: const Text('Submit Digital Proof of Delivery (POD)'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTimelineStep({
    required String title,
    required String time,
    required bool isCompleted,
    bool isCurrent = false,
    bool isLast = false,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            Container(
              width: 16,
              height: 16,
              decoration: BoxDecoration(
                color: isCurrent
                    ? AppColors.brandAmber
                    : isCompleted
                        ? AppColors.success
                        : Colors.grey.shade300,
                shape: BoxShape.circle,
              ),
              child: isCompleted
                  ? const Icon(Icons.check, size: 10, color: Colors.white)
                  : null,
            ),
            if (!isLast)
              Container(
                width: 2,
                height: 36,
                color: isCompleted ? AppColors.success : Colors.grey.shade300,
              ),
          ],
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: isCurrent ? FontWeight.w800 : FontWeight.w600,
                  color: isCurrent ? AppColors.textPrimary : AppColors.textSecondary,
                ),
              ),
              const SizedBox(height: 2),
              Text(time, style: const TextStyle(fontSize: 12, color: AppColors.textMuted)),
              const SizedBox(height: 12),
            ],
          ),
        ),
      ],
    );
  }
}
